export function load({params,cookies}){
  cookies.set("handle", params.handle, {path: "/", maxAge: 100000000000})
  return {handle: params.handle}
}
