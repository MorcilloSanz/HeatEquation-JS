# HeatEquation-JS :fire:

In mathematics, if given an open subset $U$ of $\mathbb{R}^{2}$ and a subinterval $I$ of $\mathbb{R}$, one says that a function $u : U \times I \rightarrow \mathbb{R}$ is a solution of the heat equation if

$$\frac{\partial u}{\partial t} = \alpha \Delta u$$

Where $\Delta u$ is the Laplacian of the function $u$

$$\Delta u = \sum_{i=1}^{n}\frac{\partial^{2} u}{\partial x^{2}_{i}} = \frac{\partial^{2}u}{\partial x^{2}} + \frac{\partial^{2}u}{\partial y^{2}}$$

where $(x, y; t)$ denotes a general point of the domain. It is typical to refer to $t$ as "time" and $x$, $y$ as "spatial variables," even in abstract contexts where these phrases fail to have their intuitive meaning. For any given value of $t$, the right-hand side of the equation is the Laplacian of the function $u(x, y; t) : U \rightarrow \mathbb{R}$

$\alpha$ is the diffusivity constant

## Demo

[Simulation](https://morcillosanz.github.io/HeatEquation-JS/)

![alt text](https://github.com/MorcilloSanz/HeatEquation-JS/blob/main/img/demo.png)

## Dependencies

`p5.js` for drawing
