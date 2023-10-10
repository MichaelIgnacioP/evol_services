import React from 'react';
import Layout from 'hocs/layout/Layout';
import { connect } from 'react-redux';

function Dashboard(props) {
    const { clientes, medidores } = props;

    return (
        <Layout>
            <div className="bg-white p-4 rounded-lg shadow-md fixed-component">
                <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {clientes.map((cliente) => (
                        <div key={cliente.id} className="border border-gray-200 p-4 rounded-lg">
                            <h2 className="text-lg font-semibold mb-2">{cliente.nombre}</h2>
                            <p className="text-gray-600">{cliente.direccion}</p>
                            <h3 className="text-sm font-medium mt-2">Medidores:</h3>
                            <ul className="text-gray-600">
                                {medidores
                                    .filter((medidor) => medidor.cliente_id === cliente.id)
                                    .map((medidor) => (
                                        <li key={medidor.id}>{medidor.codigo}</li>
                                    ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

const mapStateToProps = (state) => ({
    clientes: state.clientes.clientes,
    medidores: state.medidores.medidores,
});

export default connect(mapStateToProps)(Dashboard);

