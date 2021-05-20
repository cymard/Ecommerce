import React, {useState} from 'react';
import {Form} from 'react-bootstrap';

function CategoryFilter ({changeUri}) {

    const [value, setValue] = useState();

    const categories = new Map([
        ['sports/vetements', 'sports'],
        ["informatique/high-tech", 'informatique'],
        ['Toutes', 'all'],
        ['maison', 'maison'],
        ['livres', 'livres']
    ]);

    const handleChange = (e) => {
        const category = categories.get(e.target.value);
        setValue(e.target.value);
        changeUri(category)
    }


    return <Form className="d-flex justify-content-around">
        <Form.Group>
            <Form.Label>Catégorie :</Form.Label>
            <div className="d-flex">
                <Form.Control value={value} onChange={handleChange} as="select"> 
                    <option>Toutes</option>
                    <option>sports/vetements</option>
                    <option>livres</option>
                    <option>maison</option>
                    <option>informatique/high-tech</option>
                </Form.Control>
            </div>
        </Form.Group>
    </Form>
}

export default CategoryFilter;



// function CategoryFilter () {
//     let history = useHistory();

//     const useQuery = () => new URLSearchParams(useLocation().search);
//     let query = useQuery();
//     let sorting = query.get('sorting');
//     let category = query.get('category');

//     const [value, setValue] = useState(category === null ? undefined : category);

//     const categories = new Map([
//         ['sports/vetements', 'sports'],
//         ['sports/vetements', 'sports'],
//         ['sports/vetements', 'sports'],
//         ['sports/vetements', 'sports'],
//     ]);
//     // categories.set('toutes', 'all');



//     const handleChange = (e) => {
//         // changer l'url
//         const category = categories.get(e.target.value);
//         setValue(e.target.value);
//         history.push({
//             pathname: '/admin/home',
//             search: `?category=${
//                 e.target.value === "sports/vetements" ?
//                     "sports"
//                 :
//                     e.target.value === "informatique/high-tech" ?
//                         "informatique"
//                     :
//                         e.target.value === "Toutes" ?
//                             "all"
//                             :
//                                 e.target.value
//             }&page=1&sorting=${sorting}`
//           })
//         // if(e.target.value === "sports/vetements"){
//         //     history.push({
//         //         pathname: '/admin/home',
//         //         search: `?category=sports&page=1&sorting=${sorting}`
//         //       })
//         // }else if(e.target.value === "informatique/high-tech"){
//         //     history.push({
//         //         pathname: '/admin/home',
//         //         search: `?category=informatique&page=1&sorting=${sorting}`
//         //       })
//         // }else if(e.target.value === "Toutes"){
//         //     history.push({
//         //         pathname: '/admin/home',
//         //         search: `?category=all&page=1&sorting=${sorting}`
//         //       })
//         // }else{
//         //     history.push({
//         //         pathname: '/admin/home',
//         //         search: `?category=${e.target.value}&page=1&sorting=${sorting}`
//         //       })
//         // }   
//     }


//     return <Form className="d-flex justify-content-around">
//         <Form.Group>
//             <Form.Label>Catégorie :</Form.Label>
//             <div className="d-flex">
//                 <Form.Control value={value} onChange={handleChange} as="select"> 
//                     <option>Toutes</option>
//                     <option>sports/vetements</option>
//                     <option>livres</option>
//                     <option>maison</option>
//                     <option>informatique/high-tech</option>
//                 </Form.Control>
//             </div>
//         </Form.Group>
//     </Form>
// }

// export default CategoryFilter;