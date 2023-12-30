import Mode from '../enums/Mode.enum'
import EditIcon from '../images/icon-edit.svg'

interface Params {
  changeMode: Function
}

export default function Edit({ changeMode }: Params) {
  return (
    <button
      className='flex gap-2 items-center'
      onClick={() => {
        changeMode(Mode.edit)
      }}
    >
      <img src={EditIcon} className='h-3 aspect-square' />
      <p className='BlueGhostButton'>Edit</p>
    </button>
  )
}
