import json
import os
import urllib.request
from collections import Counter

BACKEND_API_URL = os.environ.get(
    "BACKEND_API_URL",
    "http://13.220.135.102:8080/movies"
)

def lambda_handler(event, context):
    try:
        with urllib.request.urlopen(BACKEND_API_URL, timeout=10) as response:
            movies = json.loads(response.read().decode("utf-8"))

        if not movies:
            return _response(200, {
                "topGenres": [],
                "longestMovie": None,
                "shortestMovie": None
            })

        genre_counter = Counter()
        longest_movie = None
        shortest_movie = None

        for movie in movies:
            duration = movie.get("duration")

            genre = movie.get("genre")
            if genre:
                genre_counter[genre] += 1

            if duration is not None:
                if not longest_movie or duration > longest_movie["duration"]:
                    longest_movie = {
                        "title": movie.get("title"),
                        "duration": duration
                    }

                if not shortest_movie or duration < shortest_movie["duration"]:
                    shortest_movie = {
                        "title": movie.get("title"),
                        "duration": duration
                    }

        top_genres = [
            {"genre": genre, "count": count}
            for genre, count in genre_counter.most_common(5)
        ]

        report = {
            "topGenres": top_genres,
            "longestMovie": longest_movie,
            "shortestMovie": shortest_movie
        }

        return _response(200, report)

    except Exception as e:
        return _response(500, {
            "error": "Failed to generate report",
            "details": str(e)
        })


def _response(status_code, body):
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps(body)
    }