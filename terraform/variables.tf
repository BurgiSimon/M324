variable "bucket_name" {
  description = "The name of the S3 bucket (must be globally unique)"
  type        = string
}

variable "region" {
  description = "AWS region for the S3 bucket"
  type        = string
  default     = "us-east-1"
}

variable "source_dir" {
  description = "Path to the Vue dist directory containing the built website files"
  type        = string
  default     = "../dist"
}
