import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Observable<Recipe[]>;
  private recipesCollection: AngularFirestoreCollection<Recipe>;

  constructor(private afs: AngularFirestore) {
    this.recipesCollection = this.afs.collection<Recipe>('recipes');
    this.recipes = this.recipesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
      })
    );
  }

  getAllRecipes() {
    return this.recipes;
  }

  getRecipe(recipeId: string) {
    return this.recipesCollection.doc(recipeId).snapshotChanges().pipe(
      map( a => {
        const data = a.payload.data();
        const id = a.payload.id;
        return { id , ...data} as Recipe;
      })
    );
  }

  deleteRecipe(recipeId: string) {
    return null;
  }
}
