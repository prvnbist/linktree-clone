interface IToggle {
   id: string
   is_active: boolean
   on_change: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Toggle = ({ id, is_active, on_change }: IToggle) => {
   return (
      <>
         <input
            id={id}
            type="checkbox"
            checked={is_active}
            onChange={on_change}
            className="react-switch-checkbox"
         />
         <label
            htmlFor={id}
            className="react-switch-label"
            title={is_active ? 'Hide' : 'Show'}
            style={{ ...(is_active && { background: '#06D6A0' }) }}
         >
            <span className="react-switch-button" />
         </label>
      </>
   )
}
