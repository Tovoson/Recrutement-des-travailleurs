const ArchiveSearch = ({ onSearch }) => {
    return (
      <div className="archive-search">
        <input
          type="text"
          placeholder="Rechercher dans les archives..."
          onChange={onSearch}
        />
      </div>
    );
  };
  
  export default ArchiveSearch;
  