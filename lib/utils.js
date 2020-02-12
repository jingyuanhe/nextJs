import moment from 'moment'
export function getLastUpdataed(time){
    return moment(time).fromNow();
}