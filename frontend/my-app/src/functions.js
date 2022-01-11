import React from "react";
import { UserContext } from "./UserContext";

export function redirectToNewsFeed() {
    window.location.href = `./newsfeed`
}


export function useAuth() {
    return React.useContext(UserContext);
  }

export function getTimeAmount(timestamp) {
    
    const seconds = (Date.now()-Date.parse(timestamp)) /1000
    if(seconds<60 ){
        return `A l'instant`
    }
    if(seconds>=60){
        const minutes = Math.round(seconds/60)
        if(minutes>60){
            const hours = Math.round(minutes/60)
            if(hours>24){
                const days = hours/24
                return `Il y a ${days} jours`
            }
            return `Il y a ${hours} heures`
        }
        return `Il y a ${minutes} minutes`
    }
    

}