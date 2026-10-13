
from dataclasses import asdict, dataclass
from typing import Optional


@dataclass
class Issue:
    """Represents a campus issue reported by a student."""

    title: str
    priority: str
    category: str
    location: str
    description: str = ""
    status: str = "Open"
    id: Optional[int] = None

    def to_dict(self):
        """Convert the issue into a dictionary."""
        return asdict(self)

    @classmethod
    def from_dict(cls, data):
        """Create an issue from dictionary data."""
        return cls(
            id=data.get("id"),
            title=data.get("title", ""),
            priority=data.get("priority", "Medium"),
            category=data.get("category", "Other"),
            location=data.get("location", ""),
            description=data.get("description", ""),
            status=data.get("status", "Open"),
        )
