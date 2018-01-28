const host = '//localhost:3001'

const handleErrors = res => {
  if (!res.ok) {
    throw Error(res.statusText)
  }
  return res.json()
}

const get = () => fetch(host).then(handleErrors)

const add = gift => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gift }),
  }

  return fetch(host, options).then(handleErrors)
}

const remove = index => {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index }),
  }

  return fetch(host, options).then(handleErrors)
}

const notify = () => fetch(host + '/notify').then(handleErrors)

export {
  get,
  add,
  remove,
  notify,
}
