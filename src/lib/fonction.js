import { deleteDoc, doc, updateDoc, collection, getDocs, orderBy, query, where  } from "firebase/firestore";
import { db } from "./firebase";
import moment from "moment/moment";


export const modifierPublication = async (id_publication, newTitle, newDescription) => {

    try {
      // Référence au document à modifier
      const publicationRef = doc(db, "publications", id_publication);
      
      // Mise à jour du document
      await updateDoc(publicationRef, {
        titre: newTitle,
        description: newDescription,
        datePublication: moment(Date().now).format("YYYY-MM-DD HH:mm:ss"),
        isArchive : false
      });
  
      
      console.log("Publication modifiée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la modification de la publication: ", error);
    }
  };

  export const archivagePublication = async (id_publication) => {
    try {
        // Référence au document à modifier
        const publicationRef = doc(db, "publications", id_publication);
        
        // Mise à jour du document
        await updateDoc(publicationRef, {
          isArchive : true
        });
    
        console.log("Publication archivée avec succès !");
      } catch (error) {
        console.error("Erreur lors de l'achivage de la publication: ", error);
      }
  }

  export const restorationArchive = async (id_publication) => {
    try {
        // Référence au document à modifier
        const publicationRef = doc(db, "publications", id_publication);
        
        // Mise à jour du document
        await updateDoc(publicationRef, {
          isArchive : false,
          datePublication: moment(Date().now).format("YYYY-MM-DD HH:mm:ss"),
        });
    
        console.log("Publication archivée avec succès !");
      } catch (error) {
        console.error("Erreur lors de l'achivage de la publication: ", error);
      }
  }

  export const supprimerPublication = async (selectedPostId) => {
    try {
        // Récupérer la référence du document à supprimer
        const publicationRef = doc(db, "publications", selectedPostId);
        
        // Supprimer le document de Firestore
        await deleteDoc(publicationRef);
        
        console.log("Publication supprimée avec succès");
    } catch (error) {
        console.error("Erreur lors de la suppression de la publication: ", error);
    }
  }

  export const recuperationDonnees = async (isArch, id_publication) => {
    const q = query(
      collection(db, "publications"),
      where("isArchive", "==", isArch),
      where("id_user", "==", id_publication),
      orderBy("datePublication", "desc"),
    );

    const querySnapshot = await getDocs(q);

    const posts = querySnapshot.docs.map(doc => ({
      id_publication: doc.id,
      ...doc.data(),
    }));

    return posts
  }




  