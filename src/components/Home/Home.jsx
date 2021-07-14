import React, { useState } from 'react';
import { Container, TextField, Button, Grid, TableContainer, Table, TableCell, TableHead, TableBody, Paper, TableRow, makeStyles } from '@material-ui/core';
import "./Home.scss";
import Logo from "../../images/logo.png";
import um from "../../images/1.PNG";
import dois from "../../images/2.PNG";
import tres from "../../images/3.PNG";
import quatro from "../../images/4.PNG";
import cinco from "../../images/5.PNG";
import { useEffect } from 'react';



function Home() {

    const [a1, setA1] = useState();
    const [a2, setA2] = useState();
    const [a3, setA3] = useState();


    const [b1, setB1] = useState();
    const [b2, setB2] = useState();
    const [b3, setB3] = useState();

    const [erroRelativo, setErroRelativo] = useState(0.001);
    const [aproximacaoX, setAproximacaoX] = useState(0);
    const [aproximacaoY, setAproximacaoY] = useState(0);

    const [resultA, setResultA] = useState();
    const [resultB, setResultB] = useState();

    const [rows, setRows] = useState([{
        campoUm: aproximacaoX,
        campoDois: aproximacaoY,
        campoTres: '',
        campoQuatro: '',
        campoCinco: '',
    }]);

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });




    const classes = useStyles();





    useEffect(() => {



        setResultA(Math.abs(a2) / Math.abs(a1) < 1 ? true : false)

        setResultB(Math.abs(b1) / Math.abs(b2) < 1 ? true : false)



        if (resultA && resultB && a3 && b3 && rows.length < 2) {

            setRows([{
                campoUm: aproximacaoX,
                campoDois: aproximacaoY,
                campoTres: '',
                campoQuatro: '',
                campoCinco: '',
            }])

            if (resultA && resultB) {

                for (let i = 1; i < 161; i++) {



                    let campo = {

                    }

                    campo['campoUm'] = (a3 - a2 * rows[i - 1].campoDois) / a1
                    campo['campoDois'] = (b3 - b1 * rows[i - 1].campoUm) / b2
                    campo['campoTres'] = Math.abs(campo.campoUm - rows[i - 1].campoUm) / campo.campoUm
                    campo['campoQuatro'] = Math.abs(campo.campoDois - rows[i - 1].campoDois) / campo.campoDois
                    campo['campoCinco'] = campo.campoTres < erroRelativo && campo.campoQuatro < erroRelativo ? 'Pare' : 'Continue'


                    rows.push(campo)

                    setRows(rows => [...rows, campo])


                }

            }
        }






    }, [a1, a2, a3, b1, b2, b3, resultA, resultB, erroRelativo, aproximacaoX, aproximacaoY, rows])



    return (
        <div className="view-home">
            <Container component="article" maxWidth="lg">
                <div className="logo">
                    <img src={Logo} />
                </div>
                <div className="titulo">
                    ÁLGEBRA LINEAR E GEOMETRIA ANALÍTICA
                </div>
                <div className="aluno">
                    Professora : Márcia Jussara Hepp Rehfeldt <br /> <br />
                    Autor : Felipe Borges de Souza <br /> <br />
                    Método Jacobi 2x2
                </div>
                <div className="t-coeficientes">
                    <h3> Coeficientes da primera equação</h3>
                </div>
                <div className="coeficientes">
                    <Grid container justify="space-around">
                        <Grid item xs={2} >
                            <TextField className="campo" value={a1} variant="outlined" margin="dense" onChange={(e) => { setA1(e.target.value) }} />
                        </Grid>
                        <Grid item xs={2} >
                            <TextField className="campo" variant="outlined" margin="dense" onChange={(e) => { setA2(e.target.value) }} />
                        </Grid>
                        <Grid item xs={2} >
                            <div className="igual">
                                =
                            </div>
                        </Grid>
                        <Grid item xs={2} >
                            <TextField className="campo" variant="outlined" margin="dense" inputProps={{ maxLength: 2 }} onChange={(e) => { setA3(e.target.value) }} />
                        </Grid>

                        <Grid item xs={2} >
                            <div className={resultA ? 'converge' : 'nao-converge'}>
                                {resultA ? 'Converge' : 'Não converge'
                                }
                            </div>
                        </Grid>
                    </Grid>
                </div>



                <div className="t-coeficientes">
                    <h3>Coeficientes da segunda equação</h3>
                </div>
                <div className="coeficientes">
                    <Grid container justify="space-around">
                        <Grid item xs={2} >
                            <TextField className="campo" value={b1} variant="outlined" margin="dense" onChange={(e) => { setB1(e.target.value) }} />
                        </Grid>
                        <Grid item xs={2} >
                            <TextField className="campo" variant="outlined" margin="dense" onChange={(e) => { setB2(e.target.value) }} />
                        </Grid>
                        <Grid item xs={2} >
                            <div className="igual">
                                =
                            </div>
                        </Grid>
                        <Grid item xs={2} >
                            <TextField className="campo" variant="outlined" margin="dense" inputProps={{ maxLength: 2 }} onChange={(e) => { setB3(e.target.value) }} />
                        </Grid>

                        <Grid item xs={2} >
                            <div className={resultB ? 'converge' : 'nao-converge'}>
                                {resultB ? 'Converge' : 'Não converge'
                                }
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <div className="titulo">Aproximação inicial em -&gt; K = 0</div>
                <Grid container justify="space-around">

                    <Grid item xs={2} >
                        <div className="titulo-item">
                            X =
                        </div>
                        <TextField className="campo" value={aproximacaoX} variant="outlined" margin="dense" onChange={(e) => { setAproximacaoX(e.target.value) }} />
                    </Grid>
                    <Grid item xs={2} >
                        <div className="titulo-item">
                            Y =
                        </div>
                        <TextField className="campo" value={aproximacaoY} variant="outlined" margin="dense" onChange={(e) => { setAproximacaoY(e.target.value) }} />
                    </Grid>
                    <Grid item xs={2} >
                        <div className="titulo-item">
                            Erro Relativo
                        </div>
                        <TextField className="campo" value={erroRelativo} variant="outlined" margin="dense" onChange={(e) => { setErroRelativo(e.target.value) }} />
                    </Grid>
                </Grid>
                {resultA && resultB && a3 && b3 ? <div className="tabela">
                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><img src={um} alt="" /></TableCell>
                                    <TableCell align="right"><img src={dois} alt="" /></TableCell>
                                    <TableCell align="right"><img src={tres} alt="" /></TableCell>
                                    <TableCell align="right"><img src={quatro} alt="" /></TableCell>
                                    <TableCell align="right"><img src={cinco} alt="" /></TableCell>
                                    <TableCell align="right">Precisão(Var. &lt; Erro)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={row.name} className={row.campoCinco === 'Pare' ? 'pare' : 'continue'}>
                                        <TableCell component="th" scope="row">
                                            {index}
                                        </TableCell>
                                        <TableCell align="right">{row.campoUm}</TableCell>
                                        <TableCell align="right">{row.campoDois}</TableCell>
                                        <TableCell align="right">{row.campoTres}</TableCell>
                                        <TableCell align="right">{row.campoQuatro}</TableCell>
                                        <TableCell align="right" >{row.campoCinco}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                    : <div className="nao">
                        Ambos não convergem
                    </div>

                }
            </Container>
        </div>
    )

}
export default Home;