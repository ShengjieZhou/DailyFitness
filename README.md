# DailyFitness

###Address Project
* [React Frontend](localhost:3000/)
* [CouchDb](localhost:5984/_utils/)
* Server port : 5000

###Api publique
[API Edamam](https://www.edamam.com/) fournit une multitude de recettes et d'informations nutritionnelles.  
Nous pouvons rechercher des ingrédients ou des recettes spécifiques pour obtenir des informations détaillées sur le contenu nutritionnel, les calories, etc.
L'utilisateur obtient les calories des aliments.


[Google Maps API](https://developers.google.com/maps?hl=zh-cn) indique la salle de sport la plus proche


###Api auto-développée
1. **Recommandations de recettes**  
Renvoie des recettes à partir des aliments sélectionnés par l'utilisateur (les recettes peuvent également être générées à l'avance).
Les recommandations ne sont disponibles que pour le bœuf, l'agneau, le poulet, les plats végétariens, etc.

2. **Recommandations diététiques**  
ChatGPT est généré à l'avance et appelé le cas échéant.
Sur la base des ingrédients choisis par l'utilisateur pour un repas, le tableau peut être comparé au tableau nutritionnel recommandé et peut être simplement classé comme suit : trop, trop élevé, adapté, moins, etc.

3. **Vidéos de fitness**  
 Les liens vers les vidéos sont stockés dans une base de données, avec des tags ajoutés en tant que mots-clés, déclenchés par des utilisateurs recherchant des éléments tels que (jambes, haut du corps).

4. **Journaux**  
Traiter toutes les actions de l'utilisateur comme s'il s'agissait du même utilisateur, utiliser une base de données de type doc pour stocker les enregistrements des actions de l'utilisateur, par exemple les enregistrements de recherche, les enregistrements de sélection d'ingrédients, les enregistrements de séances d'entraînement, etc.

###Modèles de conception utilisés
1. Map Reduce
2. contrôleur de service
3. proxy inverse
4. Cache
