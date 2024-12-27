# swarm-e-commerce

Pour publier vos propres versions des images `frontend` et `api` :

1. Se connecter à Docker avec `docker login`
2. Se rendre dans le répertoire `frontend` puis saisir `docker build -t <votre_utilisateur_docker>/classicwheels-frontend .`
3. Se rendre dans le répertoire `api` puis saisir `docker build -t <votre_utilisateur_docker>/classicwheels-api .`
4. Publier les images avec `docker push <votre_utilisateur_docker>/classicwheels-frontend` et `docker push <votre_utilisateur_docker>/classicwheels-api`
5. Les utiliser dans les fichiers `compose.yaml` et `compose.prod.yaml`
