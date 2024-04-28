const CharacterList = ({ characters }) => {
  return (
    <div className="container">
      <div className="row-API">
        {characters.map((item, index) => (
          <div key={index} className="col-lg-3 ">
            <div className="card" style={{ minWidth: "200px" }}>
              <img className="card-img-top" src={item.image} alt="character" />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <hr />
                <p className="card-text">Species: {item.species}</p>
                <p className="card-text">Location: {item.location.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;