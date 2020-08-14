const getStatus = (gStatus) => {
    switch(gStatus) {
        case 'wantToPlay': return 1;
        case 'playing': return 2;
        case 'finished': return 3;
        case 'abandoned': return 4;
        default: return -1;
    }
}

const getStatusName = (status) => {
    switch(status) {
        case 1: return 'Want to Play';
        case 2: return 'Playing';
        case 3: return 'Finished';
        case 4: return 'Abandoned';
        default: return '';
    }
}

export {getStatus, getStatusName};