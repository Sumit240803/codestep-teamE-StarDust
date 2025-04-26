type Incentive={
    icon : string;
    points ?: Number
}

interface Incentives extends Incentive{
    type : 'Passive Income' | 'Earn Task' | 'Friends' | 'Acheivements' | 'Keys'
}