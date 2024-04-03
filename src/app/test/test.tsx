'use client'
import React, { useCallback, useRef } from 'react';
import { Benchmark, BenchmarkRef } from 'react-component-benchmark';
import Page from '../project/[projectID]/page';
import Layout from '@/project/layout';

function MyComponentBenchmark() {

    const handleComplete = useCallback((results: any) => {
        console.log(results);
    }, []);

    const handleStart = () => {
        ref.current?.start();
    };

    const ref = useRef<BenchmarkRef | null>(null);

    return (
        <div>
            <button onClick={handleStart}>Run</button>
            <Benchmark
                component={Layout}
                componentProps={{ children: <Page params={{ projectID: '499011db-c56f-4064-8f30-a278749c1711' }} /> }}
                onComplete={handleComplete}
                ref={ref}
                samples={50}
                timeout={10000}
                type="mount"
            />
        </div>
    );
}

export default MyComponentBenchmark;