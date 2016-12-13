import React from 'react'

import Meta from './components/Meta'
import tlsdb from 'root/services/tlsdb'

export default function Ciphers() {
    return (
        <div>
            <Meta {...tlsdb.about} />
        </div>)
}
