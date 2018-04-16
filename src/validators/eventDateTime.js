import moment from 'moment'

export default function (date) {
  if (!date) return 'Event date is required.'
  if (!moment(date).isValid()) return 'Event date is not valid.'
  if (moment(date).isAfter(moment())) return 'Event date can not be in the future'
}
