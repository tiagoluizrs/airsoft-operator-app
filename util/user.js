import { patch } from "./request";
import { storeData } from "./storage";
import { saveImageToBase64ToUrl } from "./image";

const update = async (firebaseApp, object) => {
  alert(object.photoURL)
  try{
      if(object.photoURL && object.photoURL !== "" && object.photoURL !== "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"){
          filename = await saveImageToBase64ToUrl(
              firebaseApp,
              object.email.replace(/[^a-zA-Z0-9]/g, ""),
              object.photoURL
          );
          object.photoURL = filename;
      }
  }catch(err){
      throw(err)
  }
  alert(JSON.stringify(object))
  // try {
  //   response = await patch(`profile/${object.id}`, {}, object, true);
  //   storeData("user", object);
  // } catch (err) {
  //   console.log("Erro ao salvar perfil");
  // }
};

export { update };
