import './index.css'

const CastLink = props => {
  const {castDets} = props
  const {gender, name, profilePath, popularity, character} = castDets
  return (
    <li>
      <img
        className="popular-img"
        alt={name}
        src={`http://localhost${profilePath}`}
      />
      <div>
        <h1>
          {name} <span>(Gender:{gender})</span>
        </h1>
        <p>Playing character of: {character} </p>
        <p>Having popularity of {popularity}</p>
      </div>
    </li>
  )
}

export default CastLink
