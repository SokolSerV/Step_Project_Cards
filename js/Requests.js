import { URL, token } from "./constants.js";

export default class Requests {
    static async getToken(email, password) {
        const response = await fetch(URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return await response.text();
    }

    static async get() {
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(await response.json());
        }

        return await response.json();
    }

    static async post(object) {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(object),
        });

        if (!response.ok) {
            throw new Error(await response.json());
        }

        return await response.json();
    }

    static async put(object, id) {
        const response = await fetch(URL + "/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(object),
        });

        if (!response.ok) {
            throw new Error(await response.json());
        }

        return await response.json();
    }

    static async delete(id) {
        const response = await fetch(URL + "/" + id, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(await response.json());
        }

        return await response.text();
    }
}
