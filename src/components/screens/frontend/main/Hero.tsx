import React from 'react';
import "./css/hero.css";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="hero">
        <div className="wrapper">
            <div className="hero__title">MEMORY</div>
            <div className="hero__sub-title">LIBRARY</div>
            <div className="hero__text">PEOPLE. CITIES. EVENTS</div>
            <Image src="/memory-bg.png" className="hero__bg" alt="MEMORY LIBRARY PEOPLE. CITIES. EVENTS" width={160} height={288}/>
        </div>
    </section>
  );
};

