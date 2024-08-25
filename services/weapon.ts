import {getHeaders} from "@/services/fetcher";

const saveOrpdateWeaponProfile = async (id: number, data: any) => {
    let method = "POST";
    let url = "http://192.168.3.8:8000/api/profile-weapon/";
    if(id){
        method = "PATCH";
        url = `http://192.168.3.8:8000/api/profile-weapon/${id}/`;
        delete data.id;
    }


    const headers = await getHeaders({
        'headers': {
            'Content-Type': 'application/json'
        }
    });

    const response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify({
            ...data,
            write_upped: data.upped || false,
            write_rating_upper: data.rating_upper || 1,
            write_rating_normal: data.rating_normal || 1
        })
    })


    data = await response.json();
    console.log(data);
    if(response.status === 201) {
        return {
            message: "Armamento criado com sucesso",
            data
        }
    }else if(response.status === 200) {
        return {
            message: "Armamento atualizado com sucesso",
            data
        }
    }else{
        return {
            message: "Erro ao salvar armamento.",
            data: null
        }
    }
}

const deleteWeaponts = async (ids: number[]) => {
    const headers = await getHeaders({
        'headers': {
            'Content-Type': 'application/json'
        }
    });

    const response = await fetch(`http://192.168.3.8:8000/api/profile-weapon/delete-selected/`, {
        headers: headers,
        method: 'DELETE',
        body: JSON.stringify({ids})
    });

    if (response.status === 204) {
        return {
            message: "Armas deletadas com sucesso",
            data: null,
            status: response.status
        }
    }
    return {
        message: "Erro ao deletar armas",
        data: null,
        status: response.status
    }
}

const getWeaponProfile = async (id: string | string[]) => {
    const headers = await getHeaders({
        'headers': {
            'Content-Type': 'application/json'
        }
    });

    const response = await fetch(`http://192.168.3.8:8000/api/profile-weapon/${id}/`, {
        method: 'GET',
        headers: headers
    });

    if(response.status === 200) {
        const data = await response.json();
        return {
            message: "Ok",
            data
        }
    }
    return {
        message: "Erro ao pegar dados",
        data: null
    }
}

export {
    saveOrpdateWeaponProfile,
    getWeaponProfile,
    deleteWeaponts
};