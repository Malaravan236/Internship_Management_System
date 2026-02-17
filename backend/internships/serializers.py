from rest_framework import serializers
from accounts.models import Application, Internship
from accounts.models import Feedback, Certificate

class InternshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Internship
        fields = "__all__"


class ApplicationSerializer(serializers.ModelSerializer):
    # If frontend sends resume_link, map it to resume_drive_link
    resume_link = serializers.URLField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = Application
        fields = [
            "id",
            "internship",
            "student",
            "full_name",
            "email",
            "phone",
            "college",
            "course",
            "graduation_year",
            "cover_letter",
            "resume_link",   # accept from frontend
            "status",
            "applied_at",
        ]
        read_only_fields = ["id", "student", "status", "applied_at"]

    def validate(self, attrs):
        # If resume_link is provided, copy it into resume_drive_link
        resume_link = attrs.pop("resume_link", None)
        if resume_link is not None:
            attrs["resume_drive_link"] = resume_link
        return attrs



class FeedbackCreateSerializer(serializers.ModelSerializer):
    application_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Feedback
        fields = ["application_id", "rating", "comment"]

    def validate_rating(self, v):
        if v < 1 or v > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5.")
        return v


class CertificateSerializer(serializers.ModelSerializer):
    pdf = serializers.FileField(read_only=True)

    class Meta:
        model = Certificate
        fields = ["certificate_no", "issued_at", "verify_token", "pdf", "pdf_url"]


class ApplicationStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ["status"]
