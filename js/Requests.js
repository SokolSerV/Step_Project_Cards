import{URL,token}from"./constants.js";export default class Requests{static async getToken(t,e){t=await fetch(URL+"/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e})});if(t.ok)return t.text();throw new Error(await t.text())}static async get(){var t=await fetch(URL,{method:"GET",headers:{Authorization:"Bearer "+token}});if(t.ok)return t.json();throw new Error(await t.json())}static async post(t){t=await fetch(URL,{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+token},body:JSON.stringify(t)});if(t.ok)return t.json();throw new Error(await t.json())}static async put(t,e){e=await fetch(URL+"/"+e,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer "+token},body:JSON.stringify(t)});if(e.ok)return e.json();throw new Error(await e.json())}static async delete(t){t=await fetch(URL+"/"+t,{method:"DELETE",headers:{Authorization:"Bearer "+token}});if(t.ok)return t.text();throw new Error(await t.json())}}