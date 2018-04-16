export default function (title) {
  if (!title) return 'Title is required.'
  if (title.length > 30) return 'Title should be less than 30 characters.'
}
