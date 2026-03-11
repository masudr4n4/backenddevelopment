import { AddPerson } from '../componants/utils'

export default function Profile() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <AddPerson name="Masud">
        <p className="text-amber-400">He is having 5 years of experience as qa engineer!</p>
      </AddPerson>
    </div>
  )
}
