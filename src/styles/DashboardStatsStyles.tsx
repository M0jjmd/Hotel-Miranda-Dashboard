import styled from 'styled-components'

export const StatsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    padding: 1rem;
`

export const StatsCard = styled.div`
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 1rem;
    flex: 1 1 calc(25% - 1rem);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 768px) {
        flex: 1 1 calc(50% - 1rem);
    }

    @media (max-width: 480px) {
        flex: 1 1 100%;
    }
`

export const CardHeader = styled.h3`
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 0.5rem;
`

export const CardContent = styled.p`
    font-size: 2rem;
    font-weight: bold;
    color: #007bff;
`
