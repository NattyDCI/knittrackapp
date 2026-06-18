// export default function CelebrationPage() {
//   const p5Ref = useRef(null);

//   useEffect(() => {
//     const sketch = (p) => {
//       // TODO: pegar aquí tu código completo
//     };

//     const instance = new p5(sketch, p5Ref.current);

//     return () => {
//       instance.remove();
//     };
//   }, []);

//   return (
//     <section>
//       <h1>Milestone completed!</h1>

//       <div ref={p5Ref}></div>
//     </section>
//   );
// }

import React from 'react'

function CelebrationPage() {
  return (
    <div>CelebrationPage</div>
  )
}

export default CelebrationPage