import React,{useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as faStarRegular} from '@fortawesome/free-regular-svg-icons';

function RateWithStars ({rate}) {

    const [solidStatus, setSolidStatus] = useState({status : false, stars : undefined})
    const [regularStatus, setRegularStatus] = useState({status : false, stars : undefined})

    useEffect(( ) => {

        // 1ere etat 
        let solidStarsArray = [] // tableau contenant le nombre d'étoile correspondant à la note sur 5
        let regularStarsArray = [] // les étoiles non colorées lorsque la note est inférieure à la note maximale
        const regularStarsNumber = 5-rate

        // envoie du nombre d'étoile colorées dans le state
        if(rate === 0 ){
            setSolidStatus({status : true, stars : []})
        }else{
            for(let i = 0; i<rate; i++){
                solidStarsArray.push(<FontAwesomeIcon key={i} color="orange"  icon={faStar} />);

                if(i === (rate-1)){
                    setSolidStatus({status : true, stars : solidStarsArray})
                }
            }
        }


        // envoie du nombre d'étoile non colorées dans le state
        if(regularStarsNumber === 0 ){
            setRegularStatus({status : true, stars : []})
        }else{
            // push le nombre d'étoiles non coloriées
            for(let i = 0; i<regularStarsNumber; i++){
                regularStarsArray.push(<FontAwesomeIcon key={i+10}  color="orange"  icon={faStarRegular} />  );
                if(i === (regularStarsNumber-1)){
                    setRegularStatus({status : true, stars : regularStarsArray})
                }
            }       
        }

    },[setSolidStatus, setRegularStatus, rate])


    // permet de concatener 2 tableaux de données
    const displayRateWithStars = (array1,array2) =>  {
        let array = array1.concat(array2)
        return array
    }


    return solidStatus.status === true && regularStatus.status === true ?  displayRateWithStars(solidStatus.stars, regularStatus.stars) : "chargement"
}


export default RateWithStars;


