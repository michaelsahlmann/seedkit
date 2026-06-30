-- Agrega el tipo de bloque "agent" (5º tipo, junto a command/file/skill/note).
-- Aditivo: no altera filas existentes. Idempotente.
alter type block_type add value if not exists 'agent';
