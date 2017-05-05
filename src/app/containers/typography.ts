import { Component } from '@angular/core';
import { routeAnimation } from '../animations/route.animation';

@Component({
    selector  : 'my-typography',
    animations: [ routeAnimation ],
    host      : { '[@routeAnimation]': '' },
    styles: [`
        .typography-samples{
            display: flex;
        }
        .typography-samples > typography-widget {
            height: 100%;
        }
    `],
    template  : `
        <div class="row typography-samples">
        <div class="typography-widget col-xlg-3 col-lg-3  col-md-6 col-sm-6 col-12">
            <md-card>
                <md-card-header>
                    <h3 class="card-title">Text Size</h3>
                </md-card-header>
                <md-card-content>
                    <div class="section-block">
                        <h1>H1. Heading 1</h1>
                        <p>
                            Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque
                            pharetra,
                            placerat vestibulum eleifend pellentesque.
                        </p>
                    </div>
                    <div class="section-block">
                        <h2>H2. Heading 2</h2>
                        <p>
                            Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque
                            pharetra,
                            placerat vestibulum eleifend pellentesque.
                        </p>
                    </div>
                    <div class="section-block">
                        <h3>H3. Heading 3</h3>
                        <p>
                            Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque
                            pharetra,
                            placerat vestibulum eleifend pellentesque.
                        </p>
                    </div>
                    <div class="section-block">
                        <h4>H4. Heading 4</h4>
                        <p>Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque
                            pharetra.
                        </p>
                    </div>
                    <div class="section-block">
                        <h5>H5. Heading 5</h5>
                        <p>
                            Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque
                            pharetra.
                        </p>
                    </div>
                </md-card-content>
            </md-card>
        </div>
        <div class="typography-widget col-xlg-3 col-lg-3  col-md-6 col-sm-6 col-12">
            <md-card>
                <md-card-header>
                    <h3 class="card-title">Some more text</h3>
                </md-card-header>
                <md-card-content>
                    <div class="section-block light-text">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor,
                            quis
                            ullamcorper ligula sodales at. Nulla tellus elit, varius non commodo eget, mattis vel eros.
                            In
                            sed ornare nulla. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque
                            penatibus et magnis.
                        </p>
                    </div>
                    <div class="section-block regular-text">
                        <p>
                            Curabitur bibendum ornare dolor, quis ullamcorper ligula dfgzzzsodales at. Nullam quis risus
                            eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient
                            montes, nascetur ridiculus mus. Nullam id dolor id.
                        </p>
                    </div>
                    <div class="section-block upper-text bold-text">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor,
                            quis ullamcorper ligula sodales at. Nulla tellus elit, varius non commodo eget, mattis vel
                            eros.
                            In sed ornare nulla.
                        </p>
                    </div>
                    <div class="section-block bold-text">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor,
                            quis ullam-corper ligula sodales at. Nulla tellus elit, varius non commodo eget, mattis vel
                            eros. In sed ornare nulla.
                        </p>
                    </div>
                    <div class="section-block small-text">
                        <p>Secondary text. Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar,</p>
                        <p>lacinia scelerisque pharetra, placerat vestibulum eleifend</p>
                        <p> pellentesque, mi nam.</p>
                    </div>
                </md-card-content>
            </md-card>
        </div>
        <div class="typography-widget col-xlg-3 col-lg-3  col-md-6 col-sm-6 col-12">
            <md-card>
                <md-card-header>
                    <h3 class="card-title">Lists</h3>
                </md-card-header>
                <md-card-content>
                    <h5 class="list-header">Unordered list:</h5>
                    <ul class="blur">
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>Сlacinia scelerisque pharetra
                            <ul>
                                <li>Dui rhoncus quisque integer lorem
                                    <ul>
                                        <li>Libero iaculis vestibulum eu vitae</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>Nisl lectus nibh habitasse suspendisse ut</li>
                        <li><span>Posuere cursus hac, vestibulum wisi nulla bibendum</span></li>
                    </ul>
                    <h5 class="list-header">Ordered Lists:</h5>
                    <ol class="blur">
                        <li><span>Eu non nec cursus quis mollis, amet quam nec</span></li>
                        <li><span>Et suspendisse, adipiscing fringilla ornare sit ligula sed</span>
                            <ol>
                                <li><span>Interdum et justo nulla</span>
                                    <ol>
                                        <li><span>Magna amet, suscipit suscipit non amet</span></li>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                        <li><span>Metus duis eu non eu ridiculus turpis</span></li>
                        <li>
                        <span>
                            Neque egestas id fringilla consectetuer justo curabitur,
                            wisi magna neque commodo volutpat
                        </span>
                        </li>
                    </ol>
                    <div class="accent">
                        Important text fragment. Lorem ipsum dolor sit amet, id mollis iaculis mi nisl
                        pulvinar, lacinia scelerisque pharetra.
                    </div>
                </md-card-content>
            </md-card>
        </div>
        <div class="typography-widget col-xlg-3 col-lg-3  col-md-6 col-sm-6 col-12">
            <md-card>
                <md-card-header>
                    <h3 class="card-title">Text Color</h3>
                </md-card-header>
                <md-card-content>
                    <div class="section-block red-text ">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor,
                            quis
                            ullamcorper ligula sodales at. Nulla tellus elit, varius non commodo eget, mattis vel eros.
                            In
                            sed ornare nulla. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque
                            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                        </p>
                    </div>
                    <div class="section-block yellow-text ">
                        <p>
                            Curabitur bibendum ornare dolor, quis ullamcorper ligula dfgzzzsodales at. Nullam quis risus
                            eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient
                            montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit. In
                            sed
                            ornare nulla.
                        </p>
                    </div>
                    <div class="section-block links">
                        <p>
                            Lorem ipsum <a href="">dolor</a> sit amet, consectetur adipiscing elit. Curabitur bibendum
                            ornare dolor, quis <a href="">ullamcorper</a> ligula sodales at. Nulla tellus elit, varius
                            non
                            commodo eget, <a href="">mattis</a> vel eros. In sed ornare nulla.
                        </p>
                    </div>
                    <div class="section-block links">
                        <p><a href="">Active link — #209e91</a></p>
                        <p class="hovered"><a href="">Hover link — #17857a</a></p>
                    </div>
                </md-card-content>
            </md-card>
        </div>
        </div>
        <div class="col-lg-12 col-sm-12 col-12">
            <md-card>
                <md-card-content>
                    <div class="banner">
                        <div class="large-banner-wrapper">
                            <img alt="" src="/assets/img/typography/banner.png">
                        </div>
                        <div class="banner-text-wrapper">
                            <div class="banner-text">
                                <h1>Simple Banner Text</h1>
                                <p>Lorem ipsum dolor sit amet</p>
                                <p>Odio amet viverra rutrum</p>
                            </div>
                        </div>
                    </div>
                    <div class="section">
                        <h2>Columns</h2>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="img-wrapper"><img alt="" title=""
                                                              src="/assets/img/typography/typo03.png">
                                </div>
                                <p>
                                    Vel elit, eros elementum, id lacinia, duis non ut ut tortor blandit. Mauris
                                    <a href="">dapibus</a> magna rutrum. Ornare neque suspendisse
                                    <a href="">phasellus wisi</a>, quam cras pede rutrum suspendisse,
                                    <a href="">felis amet eu</a>. Congue magna elit quisque quia, nullam justo sagittis,
                                    ante erat libero placerat, proin condimentum consectetuer lacus. Velit condimentum
                                    velit, sed penatibus arcu nulla.
                                </p>
                            </div>
                            <div class="col-sm-6">
                                <div class="img-wrapper">
                                    <img alt="" title="" src="/assets/img/typography/typo01.png">
                                </div>
                                <p>
                                    Et suspendisse, adipiscing fringilla ornare sit ligula sed, vel nam. Interdum et
                                    justo nulla, fermentum lobortis purus ut eu, duis nibh dolor massa tristique
                                    elementum, nibh iste potenti risus fusce aliquet fusce, ullamcorper debitis primis
                                    arcu tellus vestibulum ac.
                                </p>
                            </div>
                        </div>
                        <div class="separator"></div>
                        <div class="row">
                            <div class="col-sm-4">
                                <h4>Column heading example</h4>
                                <div class="img-wrapper">
                                    <img alt="" src="/assets/img/typography/typo04.png"></div>
                                <p>
                                    Eget augue, lacus erat ante egestas scelerisque aliquam, metus molestie leo in
                                    habitasse magna maecenas
                                </p>
                                <a class="learn-more" href="">Learn more</a>
                            </div>
                            <div class="col-sm-4">
                                <h4>Yet another column heading example</h4>
                                <div class="img-wrapper">
                                    <img alt="" src="/assets/img/typography/typo05.png"></div>
                                <p>
                                    Augue massa et parturient, suspendisse orci nec scelerisque sit, integer nam mauris
                                    pede consequat in velit
                                </p>
                                <a class="learn-more" href="">Learn more</a>
                            </div>
                            <div class="col-sm-4">
                                <h4>Third column heading example</h4>
                                <div class="img-wrapper">
                                    <img alt="" src="/assets/img/typography/typo06.png"></div>
                                <p>Eget turpis, tortor lobortis porttitor, vestibulum nullam vehicula aliquam</p>
                                <a class="learn-more" href="">Learn more</a>
                            </div>
                        </div>
                        <div class="separator"></div>
                    </div>
                </md-card-content>
            </md-card>
        </div>
    `,
})
export class TypographyComponent {
}
