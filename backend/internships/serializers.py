from rest_framework import serializers
from accounts.models import Application, Internship


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
            "resume_drive_link",
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
