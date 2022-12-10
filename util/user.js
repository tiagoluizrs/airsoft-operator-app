import { saveImageBase64ToUrl, storeData } from "./storage";

const update = async (object) => {
    try {
    fileName = await saveImageBase64ToUrl(
        app,
        object.email.replace(/[^a-zA-Z0-9]/g, ""),
        object.photoURL
    );
    object.photoURL = fileName;
    } catch (err) {}
    
  try {
    storeData("user", object);
  } catch (err) {
    console.log("Erro ao salvar perfil");
  }
};

export { update };
