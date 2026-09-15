"""Change impact service layer.

Encapsulates business operations for changes and impact evaluations.
"""

from typing import List, Optional
from app.models.domain import Change, CreateChangeRequest
from app.services.store import db_store


class ChangeService:
    @staticmethod
    def list_changes() -> List[Change]:
        """Retrieve all active change records."""
        return db_store.get_all()

    @staticmethod
    def get_change(change_id: str) -> Optional[Change]:
        """Get single change record by ID."""
        return db_store.get_by_id(change_id)

    @staticmethod
    def create_change(req: CreateChangeRequest) -> Change:
        """Create a new change in draft state."""
        return db_store.create(req)

    @staticmethod
    def analyze_change(change_id: str) -> Optional[Change]:
        """Trigger local analysis engine for target change."""
        return db_store.analyze(change_id)
