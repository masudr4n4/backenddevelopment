from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from database import Base


class Todos(Base):
    __tablename__ = 'todos'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    priority = Column(Integer, nullable=False, default=0)
    completed = Column(Boolean, nullable=False, default=False)
    owner = Column(Integer, ForeignKey('users.id'), nullable=False)
