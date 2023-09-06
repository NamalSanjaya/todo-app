const hostDomain = (process.env.REACT_APP_HOST_DOMAIN || "localhost").trim();
const apiDomain = `http://${hostDomain}:8000`

const token = "token"
const unAuthCode = 401

export class UnAuthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnAuthorizedError";
  }
}
// set REACT_APP_HOST_DOMAIN=172.26.224.1 && npm start
export async function get(url: string) {
  let bearTkn = localStorage.getItem(token)
  if(bearTkn === null) {
    throw new UnAuthorizedError("token is not existed")
  }
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': bearTkn,
    }
  });

  if(resp.status === unAuthCode) {
    localStorage.removeItem(token)
    throw new UnAuthorizedError("Attempted to access unauthorized resources")
  }
  if (!resp.ok) {
    throw new Error('Get request is failed');
  }
  return await resp.json();
}

export async function update(url: string, data: object){
  let bearTkn = localStorage.getItem(token)
  if(bearTkn === null) {
    throw new UnAuthorizedError("token is not existed")
  }
  let resp = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': bearTkn,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
  });

  if(resp.status === unAuthCode) {
    localStorage.removeItem(token)
    throw new UnAuthorizedError("Attempted to access unauthorized resources")
  }

  if (!resp.ok && resp.status !== 201) {
    throw new Error('PUT request is failed');
  }
}

export async function postWithoutAuth(url: string, data: object){
  let resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
  });

  if(resp.status === unAuthCode) {
    throw new UnAuthorizedError("Attempted to access unauthorized resources")
  }

  if (!resp.ok && resp.status !== 201) {
    throw new Error('POST request is failed');
  }
  return await resp.json()
}

export async function post(url: string, data: object){
  let bearTkn = localStorage.getItem(token)
  if(bearTkn === null) {
    throw new UnAuthorizedError("token is not existed")
  }
  let resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': bearTkn,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
  });

  if(resp.status === unAuthCode) {
    localStorage.removeItem(token)
    throw new UnAuthorizedError("Attempted to access unauthorized resources")
  }

  if (!resp.ok && resp.status !== 201) {
    throw new Error('POST request is failed');
  }
}

export async function del(url: string){
  let bearTkn = localStorage.getItem(token)
  if(bearTkn === null) {
    throw new UnAuthorizedError("token is not existed")
  }
  let resp = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': bearTkn,
      }
  });

  if(resp.status === unAuthCode) {
    localStorage.removeItem(token)
    throw new UnAuthorizedError("Attempted to access unauthorized resources")
  }

  if (!resp.ok) {
    throw new Error('DELETE request is failed');
  }

}

export async function ChangeCheckStatus(id: string, state: boolean){
  await update(`${apiDomain}/task/${id}`, {isChecked: state})
}

export async function ListTasks(){
  return await get(`${apiDomain}/task`)
}

export async function RemoveTask(id: string){
  await del(`${apiDomain}/task/${id}`)
}

export async function CreateTask(title: string, desp: string){
  await post(`${apiDomain}/task`, {
    "title": title,
    "description" : desp,
    "isChecked" : false
  })
}

export async function CreateAccount(data: object){
  await postWithoutAuth(`${apiDomain}/users/signup`, data)
}

export async function LoginAccount(data: object){
  const body = await postWithoutAuth(`${apiDomain}/login`, data)
  localStorage.setItem(token, `Bearer ${body.access_token}`)
}

export function Logout(){
  localStorage.removeItem(token)
}

export async function IsLoggedIn(){
  await get(`${apiDomain}/hi`)
}
