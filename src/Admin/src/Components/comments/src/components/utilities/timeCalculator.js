import dayjs from "dayjs";
// var relativeTime = require('dayjs/plugin/relativeTime')
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const editingTimeout = 240

export const timeDifferenceCalculator = (commentTime) => {
    const currentTime = dayjs().unix();
    const timeDifferenceInSec = dayjs.unix(currentTime).diff(dayjs.unix(commentTime), 's');
    const elapsedTimeInWords = dayjs.unix(commentTime).fromNow()
    return { isEditingAllowed: timeDifferenceInSec < editingTimeout, elapsedTimeInWords }
}