'use client'

const AppFooter = () => {
    return (
        <div style={
            {
                width: '100%',
                backgroundColor: 'lightgrey',
                color: 'black',
                textAlign: 'center',
                position: 'fixed',
                bottom: 0
            }
        }>
            <span className="text-muted">Place sticky footer content here.</span>
        </div>
    );
}

export default AppFooter;