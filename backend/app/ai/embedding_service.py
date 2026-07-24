from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


class EmbeddingService:

    def __init__(self):
        self.model = SentenceTransformer(
            "all-MiniLM-L6-v2"
        )

    def similarity(
        self,
        text1: str,
        text2: str,
    ) -> float:

        embeddings = self.model.encode(
            [text1, text2]
        )

        score = cosine_similarity(
            [embeddings[0]],
            [embeddings[1]]
        )[0][0]

        return float(score)


embedding_service = EmbeddingService()