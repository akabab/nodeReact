const host = '//localhost:3001'

const handleErrors = res => {
  if (!res.ok) {
    throw Error(res.statusText)
  }
  return res
}

const get = () => fetch(host).then(handleErrors).then(res => res.json())

const add = gift => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gift }),
  }

  return fetch(host, options).then(handleErrors).then(res => res.json())
}

const remove = index => {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index }),
  }

  return fetch(host, options).then(handleErrors).then(res => res.json())
}

const notify = () => fetch(host + '/notify').then(handleErrors)

export {
  get,
  add,
  remove,
  notify,
}
