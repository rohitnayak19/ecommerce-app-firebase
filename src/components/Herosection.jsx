import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button'

const HeroSection = () => {
    return (
        <section className="bg-gradient-to-r from-primary to-primary-foreground text-primary-foreground">
            <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                        Elevate Your Style
                    </h1>
                    <p className="mt-6 text-xl text-primary-foreground/80">
                        Discover our curated collection of trendsetting fashion pieces that define your unique personality.
                    </p>
                    <div className="mt-10 flex justify-center gap-4">
                        <Button asChild size="lg" variant="secondary">
                            <Link to="/cart">
                                Shop Now
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link to="/products">
                                View Collections
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
