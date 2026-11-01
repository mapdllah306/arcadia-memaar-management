// Minimal dependency-free boot test for a Node.js environment.
// Run from project root: node --experimental-default-type=module tests/smoke.mjs
const elements=new Map(), handlers={};
const el=id=>{
  if(!elements.has(id)){
    const x={id,innerHTML:'',textContent:'',value:'all',style:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},removeAttribute(){},
      addEventListener(name,callback){(this.handlers??={})[name]=callback;},focus(){},querySelector(){return x;},setSelectionRange(){},
      reportValidity(){return true;},get selectionStart(){return 0;},get selectionEnd(){return 0;}};
    elements.set(id,x);
  }return elements.get(id);
};
globalThis.document={getElementById:el,querySelectorAll(){return [];},addEventListener(type,fn){handlers[type]=fn;},body:{style:{}},activeElement:{focus(){}}};
globalThis.localStorage={getItem(){return null;},setItem(){}};
globalThis.window={scrollTo(){}};
globalThis.confirm=()=>true;
await import('../js/app.js');
function verify(ok,label){if(!ok)throw new Error(`FAILED: ${label}`);console.log('PASS:',label);}
verify(el('side-nav').innerHTML.includes('nav-item'),'navigation');
verify(el('content').innerHTML.includes('لوحة'),'dashboard');
verify(el('company-filter').innerHTML.includes('option'),'company filter');
for (const page of ['companies','sites','employees','tasks','security','cleaning','maintenance','attendance','reports','settings','dashboard']){
  const link={dataset:{page}};
  handlers.click({target:{closest:selector=>selector==='[data-page]'?link:null}});
  verify(el('content').innerHTML.length>80,'page: '+page);
}
for (const action of ['new-task','new-site','new-employee','reset-demo']){
  const button={dataset:{action}};
  handlers.click({target:{closest:selector=>selector==='[data-action]'?button:null}});
  verify(action==='reset-demo'||el('dialog-root').innerHTML.length>100,'action: '+action);
}
console.log('Smoke test complete');
