import React, { useState } from "react";
import Card from "./Card"
import "./App.css"

const App = () => {
    return (
        <div className="app-main">
            <Card name="bossROD" age={23} gender="Male" title="Daddy" />
            <Card name="bossJOY" age={23} gender="Female" title="Mommy" />
            <Card name="bossPIM" age={4} gender="Female" title="Niece" />
            <Card name="bossEMS" age={26} gender="Male" title="Idol" />
        </div>
    )
}

export default App
