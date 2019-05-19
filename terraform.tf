variable "profile" {
  type    = "string"
  default = "jg"
}

variable "region" {
  type    = "string"
  default = "eu-west-2"
}

variable "circleci-iam-username" {
  type = "string"
  default = "circleci"
}

variable "domain" {
  type = "string"
}

variable "bucket_name" {
  type = "string"
}

provider "aws" {
  region  = "${var.region}"
  profile = "${var.profile}"
}

terraform {
  backend "s3" {
    bucket = "ana-terraform-state-prod"
    key    = "train-tracker-web/terraform.tfstate"
    region = "eu-west-2"
    profile = "jg"
  }
}

resource "aws_s3_bucket" "bucket" {
  bucket = "${var.bucket_name}"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  force_destroy = "true"
}

resource "aws_s3_bucket_policy" "public-access" {
  bucket = "${var.bucket_name}"

  depends_on = ["aws_s3_bucket.bucket"]

  policy = <<POLICY
{
  "Version":"2012-10-17",
  "Statement":[{
	"Sid":"PublicReadGetObject",
        "Effect":"Allow",
	  "Principal": "*",
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::${var.bucket_name}/*"
      ]
    }
  ]
}
POLICY
}

data "aws_route53_zone" "domain-root" {
  name = "${var.domain}"
}

resource "aws_route53_record" "api-dns-a-record" {
  name = "train-tracker.${var.domain}"
  type = "A"
  zone_id = "${data.aws_route53_zone.domain-root.zone_id}"

  alias {
    evaluate_target_health = false
    name = "${aws_s3_bucket.bucket.website_domain}"
    zone_id = "${aws_s3_bucket.bucket.hosted_zone_id}"
  }
}

resource "aws_route53_record" "api-dns-aaaa-record" {
  name = "train-tracker.${var.domain}"
  type = "AAAA"
  zone_id = "${data.aws_route53_zone.domain-root.zone_id}"

  alias {
    evaluate_target_health = false
    name = "${aws_s3_bucket.bucket.website_domain}"
    zone_id = "${aws_s3_bucket.bucket.hosted_zone_id}"
  }
}

resource "aws_iam_policy" "circle-ci-deploy-access" {
  name        = "train-tracker-web-deploy-access"
  path        = "/"
  description = "A policy to permit redeploying the latest version of the train-tracker-web to the S3 bucket"

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "BasicContentUpdate",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:DeleteObject"
            ],
            "Resource": ["arn:aws:s3:::${var.bucket_name}", "arn:aws:s3:::${var.bucket_name}/*"]
        }
    ]
}
EOF
}

resource "aws_iam_user_policy_attachment" "circel-ci-deploy-access-attachment" {
  user = "${var.circleci-iam-username}"
  policy_arn = "${aws_iam_policy.circle-ci-deploy-access.arn}"
}