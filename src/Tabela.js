function Tabela ({vetor, selecionar}) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Marca</th>
                    <th>Selecionar</th>
                </tr>
            </thead>

            <tbody>
               {
                vetor.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.nome}</td>
                            <td>{item.marca}</td>
                            <td>
                                <button onClick={() => {selecionar(index)}} className="btn btn-success">Selecionar</button>
                            </td>
                        </tr>
                    )
                })
               }
            </tbody>
        </table>
    )
}

export default Tabela